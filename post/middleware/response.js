export const postResponse = (req, res) => res.status(200).send(req.newPost);

export const postDeleteResponse = (req, res) =>
  res.status(200).send({ message: "Post Deleted" });

export const getPostsResponse = (req, res) =>
  res.status(200).send(req.fetchedPosts);

export const getPostResponse = (req, res) =>
  res.status(200).send(req.fetchedPost);
