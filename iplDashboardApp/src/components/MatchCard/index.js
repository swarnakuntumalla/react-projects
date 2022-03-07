import './index.css'

const MatchCard = props => {
  const {eachMatch} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = eachMatch
  const matchStatusClass = matchStatus === 'Won' ? 'won' : 'lost'

  return (
    <li className="match-data">
      <img
        src={competingTeamLogo}
        alt={competingTeam}
        className="competing-team-logo1"
      />
      <h1 className="competing-team-name">{competingTeam}</h1>
      <p>{result}</p>
      <h3 className={`match-status ${matchStatusClass}`}>{matchStatus}</h3>
    </li>
  )
}

export default MatchCard
