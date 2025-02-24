import React, { FC } from 'react';
import cx from 'classnames';
import { Coin } from '../../../constants/coins';
import styles from './styles.module.scss';

interface IProps {
	name: Coin;
	balance?: string;
	className?: string;
}

export const CoinBalancePanel: FC<IProps> = ({ name, balance = '0', className }) => (
	<div className={cx(styles.currency_balance, className)}>
		<div className={styles.currency_value}>{balance && (+balance).toFixed(6)}</div>

		{name === 'IbAlluoETH' || name === 'IbAlluoUSD' ? <div>{`st${name}`}</div> : <div>{`${name}x`}</div>}
	</div>
);
