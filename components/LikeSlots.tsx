function LikeSlots(props) {
  const games = props.data;
  console.log(props);
  return (
    <div>
      SLOTS
      <ul>
        {games.map((g) => (
          <li key={g.game_id}>{g.game_name}</li>
        ))}
      </ul>
    </div>
  );
}
export default LikeSlots;
