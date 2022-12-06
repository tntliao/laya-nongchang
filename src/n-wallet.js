/**
 * 获取当前链信息，返回'tron'或其他链的ID
 * @returns {Promise<string,number>}  'tron' || 11
 */
function getChainId() {
	return new Promise((resolve, reject) => {
		// ios 浏览器有可能会缓存web3 先用web3获取chainId,如果chainId==1,则在tron链
		if (window.web3) {
			web3.eth.net.getId().then(res => {
				if (res == 1) res = 'tron'
				resolve(res)
			})
		} else if (window.tronWeb) {
			resolve('tron')
		} else {
			reject('getChainId校验失败，当前不在dapp')
		}
	})
}

/**
 * @typedef {object} sendConfig 交易配置项
 * @property {string} from 当前用户钱包地址
 */
/**
 * @typedef {object} userWallet
 * @property {string} address 用户钱包地址
 * @property {string} hexAddress 用户钱包地址的十六进制表示(tronWeb对象才有)
 */

/**
 * @typedef {object} control 合约返回对象
 * @property {userWallet} userWallet 用户钱包信息
 * @property {sendfunction} send 发送交易
 * @property {promise<function>} getBalance 获取余额
 */

/**
 * @typedef {object} initObject 初始化合约配置项
 * @property {string} abi 合约对应的abi.json文件,tron链时可不传
 */

/**
 * 实例化钱包合约对象
 * @example let trxControl = new Wallet('trx',(type)=>{//type=='tron_trx'},{chainId:'tron'}) 
 * @example let TrxLooControl = new Wallet(LooAddress,(type)=>{//type=='tron_trx'},{chainId:'tron'}) 
 * @example let bnControl = new Wallet(bnAddress,(type)=>{//type=='tron_trx'},{chainId:56,abi:bn_abi}) 
 * @class Wallet
 * 
 */
class Wallet {
	/**
	 * @param {string} contractAddress 合约地址
	 * @param {function} callback 实例化合约回调,该回调接受创建合约的字符串
	 * @param {initObject} config 配置项
	 * @returns {control} control 合约实例
	 */
	constructor(contractAddress, callback, config) {
		getChainId().then(chainId => {
			if (chainId == 'tron') {
				this.userWallet = {
					address: tronWeb.defaultAddress.base58,
					hexAddress: tronWeb.defaultAddress.hex,
				}
				if (contractAddress == 'trx') {
					this.getBalance = this.Tron.trxGetBalance
					this.send = this.Tron.trxSend
					if (typeof callback == 'function') setTimeout(() => {
						callback(chainId)
					})
				} else {
					tronWeb.contract().at(contractAddress).then(res => {
						this.control = res
						this.getBalance = this.Tron.getBalance
						this.send = this.Tron.send
						if (typeof callback == 'function') setTimeout(() => {
							callback(chainId)
						})
					})
				}
			} else {
				this.control = new web3.eth.Contract(config.abi, contractAddress).methods
				web3.eth.getAccounts().then(res => {
					this.userWallet = {
						address: res[0],
					}
					this.getBalance = this.Web3.getBalance
					this.send = this.Web3.send
					if (typeof callback == 'function') setTimeout(() => {
						callback(chainId)
					})
				})
			}
		})
	}

	// web3 方法
	Web3 = {
		getBalance() {
			return new Promise((resolve, reject) => {
				this.control.balanceOf(this.userWallet.address).call().then(res => {
					resolve(Number((res + '').substring(0, res.length - 18)))
				})
			})
		},
		/**
		 * @param {string} toAddress 支付地址
		 * @param {number} value 充值数量
		 * @param {sendConfig} config 支付配置项
		 * @return {Promise<string>} 交易hash
		 */
		send(toAddress, value, config) {
			value += ''
			let accuracy = '000000000000000000'
			if (value.split('.').length > 1) {
				accuracy = accuracy.substring(value.split('.')[1].length)
			}
			return new Promise((resolve, reject) => {
				this.control.transfer(toAddress, value + accuracy).send({
					from: config.from
				}, function(error, transactionHash) {
					if (transactionHash) {
						resolve(transactionHash)
					} else if (error) {
						reject(error)
					}
				})
			})
		}
	}
	// tronWeb 方法
	Tron = {
		trxGetBalance() {
			return new Promise((resolve, reject) => {
				tronWeb.trx.getBalance(this.userWallet.address).then(res => {
					resolve(res / Math.pow(10, 6))
				}).catch(err => {
					reject(err)
				})
			})
		},
		/**
		 * @param {string} toAddress 支付地址
		 * @param {number} value 充值数量
		 * @param {sendConfig} config 支付配置项 
		 * @return {Promise<string>} 交易hash
		 */
		trxSend(toAddress, value, config) {
			return new Promise((resolve, reject) => {
				tronWeb.transactionBuilder.sendTrx(toAddress, value * Math.pow(10, 6), config.from).then(
					async tx => {
						let signedTx = await tronWeb.trx.sign(tx);
						let broastTx = await tronWeb.trx.sendRawTransaction(signedTx);
						resolve(broastTx)
					}).catch(err => {
					// 余额不足也会进catch
					let obj = {
						msg: 'trx 交易余额不足(具体报错信息查看info)',
						info: err
					}
					reject(obj)
				})
			})
		},
		getBalance() {
			return new Promise((resolve, reject) => {
				this.control.balanceOf(this.userWallet.address).call().then(res => {
					resolve(res.toNumber() / Math.pow(10, 6))
				})
			})
		},
		/**
		 * @param {string} toAddress 支付地址
		 * @param {number} value 充值数量
		 * @param {sendConfig} config 支付配置项
		 * @return {Promise<string>} 交易hash
		 */
		send(toAddress, value, config) {
			return new Promise((resolve, reject) => {
				this.control.transfer(toAddress, tronWeb.toHex(value * Math.pow(10, 6))).send({
					feeLimit: 10000000,
				}).then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}

}

