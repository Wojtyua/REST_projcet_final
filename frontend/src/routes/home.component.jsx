const Home = (props) => {
  return (
    <div>
      <h1>{props.name ? "SIEMA " + props.name : "ZALOGUJ SIE WARIACIE"}</h1>
    </div>
  );
};

export default Home;
