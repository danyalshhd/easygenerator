"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregatePaginate = void 0;
const aggregatePaginate = async (model, pipeline, page = 1, limit = 10) => {
    const numLimit = Number(limit);
    const numPage = Number(page);
    const result = await model
        .aggregate([
        ...pipeline,
        {
            $facet: {
                totalCount: [{ $count: 'total' }],
                paginatedResults: [
                    { $skip: (numPage - 1) * numLimit },
                    { $limit: numLimit },
                ],
            },
        },
    ])
        .then(async (result) => {
        const totalCount = result[0].totalCount[0]
            ? result[0].totalCount[0].total
            : 0;
        const paginatedResults = result[0].paginatedResults || [];
        const totalPages = Math.ceil(totalCount / numLimit);
        const currentPage = numPage;
        return {
            totalCount,
            totalPages,
            currentPage,
            paging: {
                limit: numLimit,
                count: paginatedResults.length,
            },
            list: paginatedResults,
        };
    })
        .catch((err) => {
        console.error(err);
    });
    return result;
};
exports.aggregatePaginate = aggregatePaginate;
//# sourceMappingURL=pagination.service.js.map