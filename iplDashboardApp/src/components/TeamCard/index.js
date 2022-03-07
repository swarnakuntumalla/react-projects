import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamImageUrl} = eachTeam

  return (
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="team-data">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <h1 className="team-name">{name}</h1>
      </li>
    </Link>
  )
}

export default TeamCard
