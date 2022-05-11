"use strict";
exports.procedureParsing = (procedureResults) => {
    const returnObject = {
        reviews: [],
    };
    for (let i = 0; i < procedureResults.length - 1; i++) {
        switch (i) {
            case 0:
                returnObject.bookData = procedureResults[i]["0"];
                break;
            case 1:
                for (let j = 0; j < Object.keys(procedureResults[i]).length - 1; j++) {
                    returnObject.reviews.push(procedureResults[i][`${j}`]);
                }
                break;
            case 2:
                returnObject.reviewCount = procedureResults[i]["0"]["review_count"];
                break;
            case 3:
                returnObject.ratingAverage = procedureResults[i]["0"]["average"];
                break;
            case 4:
                returnObject.like = Object.assign(Object.assign({}, returnObject.like), { likeCount: procedureResults[i]["0"]["like_count"] });
                break;
            case 5:
                returnObject.like = Object.assign(Object.assign({}, returnObject.like), { zero_count: procedureResults[i]["0"]["zero_state_count"] });
                break;
            case 6:
                returnObject.like = Object.assign(Object.assign({}, returnObject.like), { one_count: procedureResults[i]["0"]["one_state_count"] });
                break;
            default:
                return returnObject;
        }
    }
    return returnObject;
};
