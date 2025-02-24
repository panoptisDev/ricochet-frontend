import { call, put, select } from 'redux-saga/effects';
import { getContract } from 'utils/getContract';
import { erc20ABI } from 'constants/abis';
import { Unwrap } from 'types/unwrap';
import { allowance } from 'api/ethereum';
import { getAddress } from 'utils/getAddress';
import {
	USDCAddress,
	USDCxAddress,
	DAIAddress,
	DAIxAddress,
	MKRAddress,
	MKRxAddress,
	WETHAddress,
	WETHxAddress,
	WBTCAddress,
	WBTCxAddress,
	SUSHIAddress,
	SUSHIxAddress,
	IDLEAddress,
	IDLExAddress,
	IbAlluoETHAddress,
	StIbAlluoETHAddress,
	IbAlluoUSDAddress,
	StIbAlluoUSDAddress,
} from 'constants/polygon_config';
import { upgradeTokensList } from 'constants/upgradeConfig';
import { mainSetState } from '../actionCreators';
import { selectBalances, selectMain } from '../selectors';

export function* checkIfApprove(
	tokenAddress: string,
	superTokenAddress: string,
	param:
		| 'hasWethApprove'
		| 'hasUsdcApprove'
		| 'hasWbtcApprove'
		| 'hasDaiApprove'
		| 'hasMaticApprove'
		| 'hasMkrApprove'
		| 'hasSushiApprove'
		| 'hasIdleApprove'
		| 'hasIbAlluoETHApprove'
		| 'hasIbAlluoUSDApprove',
) {
	const main: ReturnType<typeof selectMain> = yield select(selectMain);
	const { web3 } = main;
	const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
	const contract: Unwrap<typeof getContract> = yield call(getContract, tokenAddress, erc20ABI, web3);
	const allowAmount: Unwrap<typeof allowance> = yield call(allowance, contract, address, superTokenAddress);
	const balances: ReturnType<typeof selectBalances> = yield select(selectBalances);
	const coin = upgradeTokensList.find((c) => c.tokenAddress === tokenAddress);
	const decimals = coin ? coin.multi : 1;
	const hasApprove = Number(allowAmount) > Number(balances && balances[tokenAddress]) * decimals;
	yield put(mainSetState({ [param]: hasApprove }));
}

export function* checkIfApproveWeth() {
	yield call(checkIfApprove, WETHAddress, WETHxAddress, 'hasWethApprove');
}

export function* checkIfApproveMkr() {
	yield call(checkIfApprove, MKRAddress, MKRxAddress, 'hasMkrApprove');
}

export function* checkIfApproveUsdc() {
	yield call(checkIfApprove, USDCAddress, USDCxAddress, 'hasUsdcApprove');
}

export function* checkIfApproveDai() {
	yield call(checkIfApprove, DAIAddress, DAIxAddress, 'hasDaiApprove');
}

export function* checkIfApproveWbtc() {
	yield call(checkIfApprove, WBTCAddress, WBTCxAddress, 'hasWbtcApprove');
}

export function* checkIfApproveIbAlluoETH() {
	yield call(checkIfApprove, IbAlluoETHAddress, StIbAlluoETHAddress, 'hasIbAlluoETHApprove');
}

export function* checkIfApproveIbAlluoUSD() {
	yield call(checkIfApprove, IbAlluoUSDAddress, StIbAlluoUSDAddress, 'hasIbAlluoUSDApprove');
}

export function* checkIfApproveMatic() {
	// It would be needed to approve wmatic, but not native matic
	// yield call(checkIfApprove, WMATICAddress, WMATICxAddress, 'hasWMaticApprove');
	yield put(mainSetState({ hasMaticApprove: true }));
}

export function* checkIfApproveSushi() {
	yield call(checkIfApprove, SUSHIAddress, SUSHIxAddress, 'hasSushiApprove');
}

export function* checkIfApproveIdle() {
	yield call(checkIfApprove, IDLEAddress, IDLExAddress, 'hasIdleApprove');
}
