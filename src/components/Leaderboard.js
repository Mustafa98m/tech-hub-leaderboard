import React from 'react';
import participantsData from '../data/participants.json';

const Leaderboard = () => {
  const { participants } = participantsData;
  
  // Sort participants by sortId (participants without sortId go to the end)
  const sortedParticipants = [...participants].sort((a, b) => {
    // If a participant has no sortId, treat it as a very high number (goes to end)
    const sortIdA = a.sortId || 9999;
    const sortIdB = b.sortId || 9999;
    return sortIdA - sortIdB;
  });
  
  // Get top 3 participants for podium
  const topThree = sortedParticipants.slice(0, 3);

  // Define podium data with automatic rank assignment
  const leaders = topThree.map((participant, index) => ({
    rank: index + 1,
    name: participant.name,
    problems: [127, 98, 87][index], // You can customize these scores
    medal: ['🥇', '🥈', '🥉'][index],
    color: ['#FFD700', '#C0C0C0', '#CD7F32'][index],
    rankClass: ['gold', 'silver', 'bronze'][index]
  }));

  return (
    <div className='leaderboard-container'>
      <div className='leaderboard-header'>
        <h2>🏆 Top Problem Solvers</h2>
        <p>Our most dedicated community members</p>
      </div>

      <div className='podium'>
        {/* First Place */}
        <div className='podium-position first'>
          <div className='podium-card winner'>
            <div className='winner-crown'>👑</div>
            <div className='rank-badge gold'>
              <span className='rank-number'>1</span>
            </div>
            <div className='leader-info'>
              <h3>{leaders[0].name}</h3>
              {/* <p className='problems-count'>{leaders[0].problems} problems</p> */}
            </div>
            <div className='medal'>{leaders[0].medal}</div>
          </div>
        </div>

        {/* Second Place */}
        <div className='podium-position second'>
          <div className='podium-card'>
            <div className='rank-badge silver'>
              <span className='rank-number'>2</span>
            </div>
            <div className='leader-info'>
              <h3>{leaders[1].name}</h3>
              {/* <p className='problems-count'>{leaders[1].problems} Points</p> */}
            </div>
            <div className='medal'>{leaders[1].medal}</div>
          </div>
        </div>

        {/* Third Place */}
        <div className='podium-position third'>
          <div className='podium-card'>
            <div className='rank-badge bronze'>
              <span className='rank-number'>3</span>
            </div>
            <div className='leader-info'>
              <h3>{leaders[2].name}</h3>
              {/* <p className='problems-count'>{leaders[2].problems} problems</p> */}
            </div>
            <div className='medal'>{leaders[2].medal}</div>
          </div>
        </div>
      </div>

      <div className='other-participants'>
        <h3>🌟 All Participants</h3>
        <div className='participants-grid'>
          {sortedParticipants.map((participant, index) => {
            const isTopThree = index < 3;
            const isTopTen = index < 10;
            const rankPosition = index + 1;
            
            let rankClass = '';
            let medal = '';
            
            if (isTopThree) {
              rankClass = ['gold', 'silver', 'bronze'][index];
              medal = ['🥇', '🥈', '🥉'][index];
            } else if (isTopTen) {
              rankClass = 'top-ten';
              medal = '⭐';
            }
            
            
            
            return (
              <div 
                key={participant.sortId} 
                className={`participant-card ${rankClass}`}
                style={{ '--delay': `${index * 0.1}s` }}
                data-rank={rankPosition}
                data-rank-class={rankClass}
              >
                {(isTopThree || isTopTen) && (
                  <div className='participant-rank'>
                    <span className='rank-number'>{rankPosition}</span>
                    <span className='rank-medal'>{medal}</span>
                  </div>
                )}
                <span className='participant-name'>{participant.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className='achievement-message'>
        <p>🎯 Excellence in Problem Solving</p>
        <p>Keep pushing boundaries and inspiring others!</p>
      </div>
    </div>
  );
};

export default Leaderboard;
