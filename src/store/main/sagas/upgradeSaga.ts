import { upgrade, upgradeMatic } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import { call, put, all, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { transformError } from 'utils/transformError';
import { MATICxAddress } from 'constants/polygon_config';

import Web3 from 'web3';
import { mainSetState, upgradeAction } from '../actionCreators';
import {
	checkIfApproveUsdc,
	checkIfApproveMkr,
	checkIfApproveDai,
	checkIfApproveWeth,
	checkIfApproveWbtc,
	checkIfApproveSushi,
	checkIfApproveMatic,
	checkIfApproveIdle,
	checkIfApproveIbAlluoETH,
	checkIfApproveIbAlluoUSD,
} from './checkIfApprove';
import { getBalances } from './getBalances';
import { selectMain } from '../selectors';

export function* upgradeSaga(tokenAddress: string, value: string) {
	const main: ReturnType<typeof selectMain> = yield select(selectMain);
	const { web3 } = main;
	const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
	const contract: Unwrap<typeof getContract> = yield call(getContract, tokenAddress, superTokenABI, web3);
	if (tokenAddress === MATICxAddress) {
		yield call(upgradeMatic, contract, value, address);
	} else {
		yield call(upgrade, contract, value, address);
	}
	yield call(getBalances, address);
}

export function* upgradeMainSaga({ payload }: ReturnType<typeof upgradeAction>) {
	try {
		yield put(mainSetState({ isLoadingUpgrade: true }));
		const { superTokenAddress, value } = payload;
		// Superfluid upgrade contract requires the upgrade value to be scaled by 1e18 and not decimals
		const amount = Web3.utils.toWei(value, 'ether');

		yield call(upgradeSaga, superTokenAddress, amount);
		payload.callback();
		yield all([
			call(checkIfApproveUsdc),
			call(checkIfApproveMkr),
			call(checkIfApproveDai),
			call(checkIfApproveWeth),
			call(checkIfApproveWbtc),
			call(checkIfApproveSushi),
			call(checkIfApproveMatic),
			call(checkIfApproveIdle),
			call(checkIfApproveIbAlluoETH),
			call(checkIfApproveIbAlluoUSD),
		]);
	} catch (e) {
		const error = transformError(e);
		payload.callback(error);
	} finally {
		yield put(mainSetState({ isLoadingUpgrade: false }));
	}
}
