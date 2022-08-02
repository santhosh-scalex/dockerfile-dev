const {
    UserMaster,
    UserToWishListMapping,
    PosLineItem,
    ProductInfo,
    UserToNotificationSetting,
} = require('../models')

module.exports = {
    listUsers() {
        return UserMaster.findAll()
            .then((response) => Promise.resolve(response || []))
            .catch((error) => Promise.reject(error))
    },
    addNotificationSetting(requestData) {
        return UserToNotificationSetting.findOne({
            where: {
                email: requestData.email,
            },
        }).then(function (settings) {
            // update
            if (settings) return settings.update(requestData)
            // insert
            return UserToNotificationSetting.create(requestData)
        })
    },
    getNotificationSetting(email) {
        return UserToNotificationSetting.findOne({
            raw: true,
            where: {
                email,
            },
        })
            .then((notificationSetting) =>
                Promise.resolve(notificationSetting || [])
            )
            .catch((error) => Promise.reject(error))
    },
    addWishList(requestData) {
        return UserToWishListMapping.findOne({
            where: {
                email: requestData.email,
            },
        }).then(function (wishList) {
            // update
            if (wishList) return wishList.update(requestData)
            // insert
            return UserToWishListMapping.create(requestData)
        })
    },
    listWishList(email) {
        return UserToWishListMapping.findOne({
            raw: true,
            where: {
                email,
            },
        })
            .then((wishList) => Promise.resolve(wishList || []))
            .catch((error) => Promise.reject(error))
    },
    getTopPerformer() {
        return PosLineItem.findAll({
            attributes: [
                'id',
                'sku',
                'brand',
                'size',
                'shoe_condition',
                'box_condition',
                'price',
                'market_value',
                'percentage',
                'createdAt',
            ],
            include: [
                {
                    model: ProductInfo,
                    as: 'product',
                },
            ],
            order: [
                ['percentage', 'DESC'],
                ['createdAt', 'DESC'],
            ],
            limit: 10,
        })
            .then((topPerformer) => Promise.resolve(topPerformer))
            .catch((error) => Promise.reject(error))
    },
    addWithStudents(req, res) {
        return Classroom.create(
            {
                class_name: req.body.class_name,
                students: req.body.students,
            },
            {
                include: [
                    {
                        model: Student,
                        as: "students",
                    },
                ],
            }
        )
            .then((classroom) => res.status(201).send(classroom))
            .catch((error) => res.status(400).send(error));
    },
};
