import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { Character, Race } from '@repo/core';
import { HeartIcon } from 'lucide-react';

import { getRaceColors } from '@/game/styling/get-race-colors';

import styles from './index.module.css';

interface SidebarProps {
  chatMessages: string[];
  selectedCharacter?: Character;
}

export const Sidebar: React.FC<SidebarProps> = ({ chatMessages, selectedCharacter }) => {
  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.chatLogContainer}>
            <h2 className={styles.heading}>Game Log</h2>
            <div className={styles.chatWindow}>
              {chatMessages.map((chatMessage, index) => (
                <p key={index}>{chatMessage}</p>
              ))}
            </div>
          </div>

          <div className={styles.characterContainer}>
            <h2 className={styles.heading}>Character Info</h2>
            {selectedCharacter && (
              <div className="space-y-4">
                <div>
                  <h3 className={styles.heading}>{selectedCharacter.name}</h3>
                  <div className={styles.characterInformation}>
                    <span className={getRaceColors(Race.fromLabel(selectedCharacter.race)).text}>{selectedCharacter.race}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedCharacter.specialization}</span>
                  </div>
                </div>

                <div className={styles.characterMainStatsContainer}>
                  <div className={styles.characterMainStats}>
                    <HeartIcon className={`${styles.characterMainStatsIcon} text-danger`} />
                    <span>
                      {selectedCharacter.currentHP}/{selectedCharacter.maxHP}
                    </span>
                  </div>
                  <div className={styles.characterMainStats}>
                    <HeartIcon className={styles.characterMainStatsIcon} />
                    <span>Defense: {selectedCharacter.ac}</span>
                  </div>
                </div>

                <Table hideHeader>
                  <TableHeader>
                    <TableColumn>Property</TableColumn>
                    <TableColumn>Value</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {[
                      { label: 'Strength', value: selectedCharacter.strength },
                      { label: 'Dexterity', value: selectedCharacter.dexterity },
                      { label: 'Constitution', value: selectedCharacter.constitution },
                      { label: 'Intelligence', value: selectedCharacter.intelligence },
                      { label: 'Wisdom', value: selectedCharacter.wisdom },
                      { label: 'Charisma', value: selectedCharacter.charisma },
                    ].map(({ label, value }) => (
                      <TableRow key={label}>
                        <TableCell>{label}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
