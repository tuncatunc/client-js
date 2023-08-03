/**
 * Backup the Stark L1 registration payload for the currently logged in account
 * @type {(dvf: ReturnType<import('../lib/dvf/bindApi')>,
 * nonce: string,
 * signature: string) => string}
 */
module.exports = async (dvf, tradingKey, nonce, signature) => {
  const url = '/v1/trading/storeStarkL1Registration'

  const { ethAddress } = await dvf.getUserConfig()

  const l1RegistrationSignature = await dvf.stark.signRegistration(
    tradingKey,
    ethAddress
  )

  const data = {
    l1RegistrationSignature
  }

  return dvf.postAuthenticated(url, nonce, signature, data)
}
