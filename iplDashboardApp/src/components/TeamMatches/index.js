import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatchDetails: [],
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  updateTeamBannerUrl = data => ({
    teamBannerUrl: data,
  })

  updateMatchDetails = data => ({
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    date: data.date,
    firstInnings: data.first_innings,
    id: data.id,
    manOfTheMatch: data.man_of_the_match,
    matchStatus: data.match_status,
    result: data.result,
    secondInnings: data.second_innings,
    umpires: data.umpires,
    venue: data.venue,
  })

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedTeamBannerUrl = this.updateTeamBannerUrl(data.team_banner_url)
    const updatedLatestMatchDetails = this.updateMatchDetails(
      data.latest_match_details,
    )
    const updatedRecentMatchDetails = data.recent_matches.map(eachMatch =>
      this.updateMatchDetails(eachMatch),
    )

    this.setState({
      isLoading: false,
      teamBannerUrl: updatedTeamBannerUrl.teamBannerUrl,
      latestMatchDetails: updatedLatestMatchDetails,
      recentMatchDetails: updatedRecentMatchDetails,
    })
  }

  getBackgroundColor = id => {
    if (id === 'RCB') {
      return 'rcb-bg'
    }
    if (id === 'KKR') {
      return 'kkr-bg'
    }
    if (id === 'KXP') {
      return 'kxp-bg'
    }
    if (id === 'CSK') {
      return 'csk-bg'
    }
    if (id === 'RR') {
      return 'rr-bg'
    }
    if (id === 'MI') {
      return 'mi-bg'
    }
    if (id === 'SH') {
      return 'srh-bg'
    }
    return 'dc-bg'
  }

  render() {
    const {
      isLoading,
      teamBannerUrl,
      latestMatchDetails,
      recentMatchDetails,
    } = this.state
    console.log(latestMatchDetails)

    const {match} = this.props
    const {params} = match
    const {id} = params

    const backgroundColor = this.getBackgroundColor(id)

    return (
      <div className={`team-match-container ${backgroundColor}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <div>
            <img src={teamBannerUrl} alt={id} className="match-team-logo" />
            <div className="latest-matches-container">
              <h2>Latest Matches</h2>
              <LatestMatch
                latestMatchDetails={latestMatchDetails}
                key={latestMatchDetails.id}
              />
            </div>
            <ul className="match-list">
              {recentMatchDetails.map(eachMatch => (
                <MatchCard eachMatch={eachMatch} key={eachMatch.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
