import React from "react";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: 1,
      teamData1: null,
      teamData2: null,
      teamName: null, // Add this line
      logo: null,     // Add this line
    };
    
  }

  componentDidMount() {
    this.fetchTeamData(1);
    this.fetchTeamData(2);
    this.startLongPolling();
  }

  componentWillUnmount() {
    this.stopLongPolling();
  }

  startLongPolling = () => {
    this.longPollingTimer = setInterval(() => {
      this.fetchTeamData(1);
      this.fetchTeamData(2);
    }, 5000);
  };

  stopLongPolling = () => {
    clearInterval(this.longPollingTimer);
  };

  fetchTeamData = async (teamNumber) => {
    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbytTm014zBzsgo4szlF4CX-FXQN90jIUrvutmplH7oCMW8Qwfv5ndSrcUqdG6vWbnhp/exec?team=${teamNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      console.log(`Fetched data for Team ${teamNumber}:`, data);
  
      // Assuming data.data is an array with rows and columns
      const teamData = Array.isArray(data.data) ? data.data.slice(1) : [];
  
      // Assuming the structure of your data is [ID, TEAM, PHOTO]
      const teamName = teamData.length > 0 ? teamData[0][1] : null; // Assuming team name is in B2 of the second row
      const logo = teamData.length > 0 ? teamData[0][2] : null;   // Assuming logo is in C2 of the second row
  
      this.setState({
        [`teamData${teamNumber}`]: teamData,
        teamName: teamName,
        logo: logo,
      });
    } catch (error) {
      console.error(`Error fetching data for Team ${teamNumber}:`, error);
    }
  };
  
  
  renderTeamContainer = (teamData, teamNumber) => {
    return (
      <div key={teamNumber} className="team-container">
        {teamData && teamData.length > 0&& (
          teamData.map((team, index) => (
            <div key={index} className="team-box">
              <img
                className="logo"
                src={team.PHOTO}
                alt={`Logo for ${team.TEAM}`}
              />
              <div className="team-name">{team.TEAM}</div>
            </div>
          ))
        )}
      </div>
    );
  };

  handleTeamChange = (teamNumber) => {
    this.setState({ selectedTeam: teamNumber });
  };

  render() {
    const { selectedTeam, teamData1, teamData2, teamName, logo } = this.state;
    console.log('Component State:', this.state); // Log the component state
  
    // ... (rest of the render method)
    
    let side1Data = [];
    let side2Data = [];
  
    let totalData = [];
    if (selectedTeam === 1 && teamData1) {
      totalData = teamData1;
    } else if (selectedTeam === 2 && teamData2) {
      totalData = teamData2;
    }
  
    const maxEntriesPerSide = 10; // Adjust this value as needed
    const totalEntries = totalData.length;
  
    // Calculate the number of entries to display on each side
    const entriesPerSide = Math.ceil(totalEntries / 2);
    const remainingEntries = totalEntries - entriesPerSide;
  
    if (totalData.length > 0) {
      side1Data = totalData.slice(0, entriesPerSide);
      side2Data = totalData.slice(entriesPerSide, entriesPerSide + remainingEntries);
    }
  
    // Calculate the width and height of the team container dynamically
    const containerWidth = 100 / maxEntriesPerSide; // Adjust as needed
    const containerHeight = Math.ceil(totalEntries / maxEntriesPerSide) * 100 / Math.ceil(totalEntries / maxEntriesPerSide); // Adjust as needed
  
    return (
      <div className="map">
        <div className="side1">
          <div className="team-container" style={{ width: `${containerWidth}%`, height: `${containerHeight}%` }}>
            {side1Data.map((team, index) => (
              <div key={index} className="team-box">
                <img
                  className="logo"
                  src={team.PHOTO}
                  alt={`Logo for ${team.TEAM}`}
                />
                <div className="team-name">{team.TEAM}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="side2">
          <div className="team-container" style={{ width: `${containerWidth}%`, height: `${containerHeight}%` }}>
            {side2Data.map((team, index) => (
              <div key={index} className="team-box">
                <img
                  className="logo"
                  src={team.PHOTO}
                  alt={`Logo for ${team.TEAM}`}
                />
                <div className="team-name">{team.TEAM}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
}

export default Map;
