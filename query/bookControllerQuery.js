exports.ALL_REVIEW_QUERY_ORDER_TOTALREVIEW =
  "select id, title, author, publisher, img, isbn, count(*) as countReviews from userbooklists where review is not null group by isbn order by countReviews desc limit ?, ?";
exports.ALL_REVIEW_QUERY_ORDER_NEW =
  "select id, title, author, publisher, img, isbn, count(*) as countReviews from userbooklists where review is not null group by isbn order by createdAt desc limit ?, ?";
exports.ONE_BOOK_REVIEWS_BOOK_DATA =
  "select id, title, author, publisher, img, isbn, count(*) as countReviews, avg(rating) as ratingAverage from userbooklists where isbn = ? and review is not null group by isbn";

exports.ONE_BOOK_REVIEWS_REVIEW_DATA_ORDER_LIKE_COUNT = `
select userbooklists.id as id, users.id as userId, users.username as username, users.email as email, users.nick as nick, users.role as role, review, rating, reviewCreationTime,
( select count(*) from bookreviewlikes where userbooklists.id = bookreviewlikes.userBookListId ) as likeCount,
( select count(*) from bookreviewlikes where userbooklists.id = bookreviewlikes.userBookListId and state = 0 ) as zeroLikeCount,
( select count(*) from bookreviewlikes where userbooklists.id = bookreviewlikes.userBookListId and state = 1 ) as oneLikeCount
from userbooklists
join users
on users.id = userbooklists.userId
where isbn = ? and review is not null
order by likeCount desc
limit ?, ?
`;

exports.ONE_BOOK_REVIEWS_REVIEW_DATA_ORDER_NEW = `
select userbooklists.id as id, users.id as userId, users.username as username, users.email as email, users.nick as nick, users.role as role, review, rating, reviewCreationTime,
( select count(*) from bookreviewlikes where userbooklists.id = bookreviewlikes.userBookListId ) as likeCount,
( select count(*) from bookreviewlikes where userbooklists.id = bookreviewlikes.userBookListId and state = 0 ) as zeroLikeCount,
( select count(*) from bookreviewlikes where userbooklists.id = bookreviewlikes.userBookListId and state = 1 ) as oneLikeCount
from userbooklists
join users
on users.id = userbooklists.userId
where isbn = ? and review is not null
order by reviewCreationTime desc
limit ?, ?
`;

exports.ALL_TYPE_REVIEW = `select count(*) as count from (select * from userbooklists group by isbn) subTable where review is not null`;
