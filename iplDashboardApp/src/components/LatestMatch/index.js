import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestMatchDetails

  return (
    <div className="latest-match">
      <div>
        <h1>{competingTeam}</h1>
        <h2>{date}</h2>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={competingTeam}
        className="competing-team-logo"
      />
      <div>
        <h1 className="latest-matches-headings">First Innings</h1>
        <p>{firstInnings}</p>
        <h1 className="latest-matches-headings">Second Innings</h1>
        <p>{secondInnings}</p>
        <h1 className="latest-matches-headings">Man Of The Match</h1>
        <p>{manOfTheMatch}</p>
        <h1 className="latest-matches-headings">Umpires</h1>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
