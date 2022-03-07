import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsData: [], isLoading: true}

  componentDidMount() {
    this.getTeamsData()
  }

  updateData = data => ({
    id: data.id,
    name: data.name,
    teamImageUrl: data.team_image_url,
  })

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teamData = data.teams
    const updatedData = teamData.map(eachItem => this.updateData(eachItem))
    this.setState({teamsData: updatedData, isLoading: false})
  }

  render() {
    const {teamsData, isLoading} = this.state

    return (
      <div className="home-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <>
            <div className="logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl-logo"
                className="ipl-logo"
              />
              <h1 className="heading">IPL Dashboard</h1>
            </div>
            <ul className="teams-list">
              {teamsData.map(eachTeam => (
                <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default Home
