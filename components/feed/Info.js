
const style = {
  profilePic: "h4 w-4 rounded-full",
  wrapper: "flex items-center space-x-1 text-xs text-[#818384]",
  profilePicContainer: "flex items-center space-x-1",
  postedBy: 'flex items-center space-x-1',
  tag: "cursor=pointer text-xs font-semibold text-[#D7DADC] hover:underline",
};
const Info = ( {author} ) => {
  return (
    <div className={style.wrapper}>
      <div className={style.profilePicContainer}>
      <img
          className={style.profilePic}
          src={author.author.image}
        />
      </div>
      <div className={style.tag}>{author.name}</div>
      <div>•</div>
      <div className={style.postedBy}>
        <span>Posted By {author.author.name}</span>
        <span>•</span>
        <span>{author.createdAt}</span>
      </div>
    </div>
  );
};
export default Info;
