const express = require('express')
const router = express.Router()
const { userController, assetsController } = require('../controllers')

/* GET user listing. */
router.get('/list-users', userController.listUsers)

/* ADD/UPDATE/GET notification settings. */
router.post('/add-notification-setting', userController.addNotificationSetting)
router.get('/get-notification-setting', userController.getNotificationSetting)

/* ADD to assets. */
router.post('/add-assets', assetsController.addAsset)
router.post('/add-assets-metadata', assetsController.addAssetsMetaData)

/* GET assets listing. */
router.get('/get-assets-metadata', assetsController.getAssetsMetaData)
router.get('/assets', assetsController.listAssets)
router.get('/list-public-assets', assetsController.listPublicAssets)
router.get('/assets-count', assetsController.getAssetsCount)
router.get('/assets/:id', assetsController.getAssetsById)

router.get('/top-performers', userController.getTopPerformer)

/* ADD to wish list. */
router.post('/add-wish-list', userController.addWishList)

/* GET wish listing. */
router.get('/wish-list', userController.listWishList)

/* GET user test. */
router.get('/', function (_req, res, _next) {
    res.send('respond with a resource')
})

module.exports = router
