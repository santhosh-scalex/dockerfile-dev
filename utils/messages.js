const commonConstants = require("./constants");
module.exports = {
    COMMON: {
        SAVED: "Saved successfully.",
        ADDED: "Added successfully.",
        GET_SUCCESS: "Data retrieved successfully.",
        FAILED: "Something went wrong! please try again after sometime.",
        EMAIL: {
            REQUIRED: "Email should not be empty.",
            VALID_EMAIL: "Please enter valid email.",
        },
        INVALID_ID: "Please send valid id.",
    },
    ASSETS: {
        INVALID_META_DATA: "Invalid assets meta data.",
        ADDED_SUCCESSFULLY: "Assets added successfully.",
    },
    SKU: {
        REQUIRED: "SKU should not be empty.",
    },
    NOTIFICATION_SETTING: {
        REQUIRED: "Notification setting should not be empty.",
    },
    RANGE: {
        VALID_RANGE: `Range must be one of ${commonConstants.RANGE}`,
    },
    SIZE: {
        VALID_SIZE: `Size must be one of ${commonConstants.SIZE}`,
    },
    SOLE_GRADE: {
        VALID_SOLE_GRADE: `Sole grade must be one of ${commonConstants.SOLE_GRADE}`,
    },
    CONDITION: {
        VALID_CONDITION: `Condition must be one of ${commonConstants.CONDITION}`,
    },
    STORED: {
        VALID_STORED: `Stored must be one of ${commonConstants.STORED}`,
    },
};
