const {
    sequelize,
    UserToAssetsMapping,
    ProductInfo,
    UserToAssetsMetaData,
} = require('../models')

module.exports = {
    addAssetsMetaData(requestData) {
        return UserToAssetsMetaData.findOne({
            where: {
                email: requestData.email,
            },
        }).then(function (metaData) {
            // update
            if (metaData) return metaData.update(requestData)
            // insert
            return UserToAssetsMetaData.create(requestData)
        })
    },
    getAssetsMetaData(email) {
        return UserToAssetsMetaData.findOne({
            where: {
                email,
            },
        })
            .then((metaData) => Promise.resolve(metaData || []))
            .catch((error) => Promise.reject(error))
    },
    addAsset(requestData) {
        return UserToAssetsMapping.bulkCreate(requestData)
            .then(async (response) => {
                const addedIds = response.map((dataValues) => dataValues.id)
                const result = await this.getAssetsByIds(addedIds)
                return Promise.resolve(result)
            })
            .catch((error) => Promise.reject(error))
    },
    getAssetsById(id) {
        return UserToAssetsMapping.findByPk(id, {
            include: [
                {
                    model: ProductInfo,
                    as: 'product',
                },
            ],
        })
            .then((assetDetail) => Promise.resolve(assetDetail || {}))
            .catch((error) => Promise.reject(error))
    },
    getAssetsByIds(ids = []) {
        return UserToAssetsMapping.findAll({
            where: {
                id: ids,
            },
            include: [
                {
                    model: ProductInfo,
                    as: 'product',
                },
            ],
            order: [['createdAt', 'DESC']],
        })
            .then((assetsList) => Promise.resolve(assetsList || []))
            .catch((error) => Promise.reject(error))
    },
    getAssetsCount(email) {
        return UserToAssetsMapping.findAll({
            raw: true,
            where: {
                email,
            },
            attributes: [
                'email',
                [sequelize.fn('COUNT', 'id'), 'assets_count'],
            ],
            group: ['email'],
        })
            .then((assetsCount) => Promise.resolve(assetsCount || []))
            .catch((error) => Promise.reject(error))
    },
    listAssets(where) {
        return UserToAssetsMapping.findAndCountAll({
            where,
            include: [
                {
                    model: ProductInfo,
                    as: 'product',
                },
            ],
            order: [['createdAt', 'DESC']],
        })
            .then((assetsList) => Promise.resolve(assetsList || []))
            .catch((error) => Promise.reject(error))
    },
}
