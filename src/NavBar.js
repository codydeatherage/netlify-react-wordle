import React, { useState } from 'react'
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog';
import { List } from 'react-bootstrap-icons'
import { QuestionCircle } from 'react-bootstrap-icons'
import { BarChartLine } from 'react-bootstrap-icons'
import { GearFill } from 'react-bootstrap-icons'
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Nav = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    width: calc(100vw - 2em);
    height: 65px;
    border-bottom: 1px solid #3A3A3C;
    font-size: 16px;
    
    color: white;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    > * {
        flex: 1;
        }
    > div {
        text-align: left;
    }
    > h1{
        text-align: center;
        font-family: Bevan, Arial;
        font-size: 36px;
        font-weight: 100;
    }
`

const HalfBox = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 50vw;
    height: 100vh;
    border-right: 1px solid red;
`

const NavItems = styled.div`
    display: flex;
    gap: 1em;
    justify-content: flex-end;
`

export const NavBar = () => {
    const [helpOpen, setHelpOpen] = useState(false);
    const [statsOpen, setStatsOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleClickOpen = (type) => {
        switch(type){
            case 'help': setHelpOpen(true); break;
            case 'stats': setStatsOpen(true); break;
            case 'settings': setSettingsOpen(true); break;
            default : break;
        }
    };

    const handleClose = (type) => {
        switch(type){
            case 'help': setHelpOpen(false); break;
            case 'stats': setStatsOpen(false); break;
            case 'settings': setSettingsOpen(false); break;
            default : break;
        }
    };

    return (
        <Nav>
            <div>
                <List fontSize={28} />
            </div>
            <h1>Wordle</h1>
            <NavItems>
                <QuestionCircle onClick={() => handleClickOpen('help')} fontSize={30} />
                <BarChartLine onClick={() => handleClickOpen('stats')} fontSize={30} />
                <GearFill onClick={() => handleClickOpen('settings')} fontSize={30} />
            </NavItems>
            <Dialog
                open={helpOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClose('help')}
                aria-describedby="alert-dialog-slide-description"
            >
                <div>HELP</div>
            </Dialog>
            <Dialog
                open={statsOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClose('stats')}
                aria-describedby="alert-dialog-slide-description"
            >
                <div>Stats</div>
            </Dialog>
            <Dialog
                open={settingsOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClose('settings')}
                aria-describedby="alert-dialog-slide-description"
            >
                <div>Settings</div>
            </Dialog>
        </Nav>
    )
}
