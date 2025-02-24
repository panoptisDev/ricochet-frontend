import wbtc from 'assets/images/coins/bitcoin.svg';
import btc from 'assets/images/coins/bitcoinRotate.svg';
import eth from 'assets/images/coins/ethereum.svg';
import shib from 'assets/images/coins/shibaInu.svg';
import usdt from 'assets/images/coins/tetherUsdt.svg';
import usdc from 'assets/images/coins/usdCoin.svg';
import dai from 'assets/images/coins/dai.svg';
import matic from 'assets/images/coins/matic.svg';
import mkr from 'assets/images/coins/mkr.svg';
import ric from 'assets/images/coins/ric.svg';
import sushi from 'assets/images/coins/sushiswap.svg';
import slp from 'assets/images/coins/slp.svg';
import idle from 'assets/images/coins/idle.svg';
import iballuousd from 'assets/images/coins/ibusd.svg';
import iballuoeth from 'assets/images/coins/ibeth.svg';

export enum Coin {
	WBTC = 'WBTC',
	IDLE = 'IDLE',
	BTC = 'BTC',
	ETH = 'ETH',
	SHIB = 'SHIB',
	USDT = 'USDT',
	USDC = 'USDC',
	DAI = 'DAI',
	MATIC = 'MATIC',
	MKR = 'MKR',
	RIC = 'RIC',
	WETH = 'ETH',
	SLP = 'USDC-ETH',
	USDCx = 'USDCx',
	DAIx = 'DAIx',
	MKRx = 'MKRx',
	WETHx = 'WETHx',
	ETHx = 'ETHx',
	WBTCx = 'WBTCx',
	rexLPEth = 'USDC/ETH',
	SUSHI = 'SUSHI',
	MATICx = 'MATICx',
	SUSHIx = 'SUSHIx',
	IDLEx = 'IDLEx',
	IbAlluoETH = 'IbAlluoETH',
	IbAlluoUSD = 'IbAlluoUSD',
	StIbAlluoETH = 'StIbAlluoETH',
	StIbAlluoUSD = 'StIbAlluoUSD',
}

export const namesCoin = [
	Coin.USDC,
	Coin.DAI,
	Coin.MKR,
	Coin.WETH,
	Coin.WBTC,
	Coin.SLP,
	Coin.MATIC,
	Coin.SUSHI,
	Coin.IDLE,
	Coin.IbAlluoETH,
	Coin.IbAlluoUSD,
];

export const namesCoinX = [
	Coin.DAIx,
	Coin.MKRx,
	Coin.USDCx,
	Coin.WBTCx,
	Coin.WETHx,
	Coin.rexLPEth,
	Coin.MATICx,
	Coin.SUSHIx,
	Coin.IDLEx,
	Coin.StIbAlluoETH,
	Coin.StIbAlluoUSD,
];

export const iconsCoin: Partial<Record<Coin, string>> = {
	[Coin.USDC]: usdc,
	[Coin.WBTC]: wbtc,
	[Coin.ETH]: eth,
	[Coin.USDT]: usdt,
	[Coin.SHIB]: shib,
	[Coin.BTC]: btc,
	[Coin.DAI]: dai,
	[Coin.MATIC]: matic,
	[Coin.MKR]: mkr,
	[Coin.RIC]: ric,
	[Coin.WETH]: eth,
	[Coin.SLP]: slp,
	[Coin.DAIx]: dai,
	[Coin.MKRx]: mkr,
	[Coin.USDCx]: usdc,
	[Coin.WBTCx]: wbtc,
	[Coin.WETHx]: eth,
	[Coin.ETHx]: eth,
	[Coin.rexLPEth]: slp,
	[Coin.IDLE]: idle,
	[Coin.IDLEx]: idle,
	[Coin.SUSHI]: sushi,
	[Coin.MATICx]: matic,
	[Coin.SUSHIx]: sushi,
	[Coin.IbAlluoETH]: iballuoeth,
	[Coin.IbAlluoUSD]: iballuousd,
	[Coin.StIbAlluoETH]: iballuoeth,
	[Coin.StIbAlluoUSD]: iballuousd,
};
