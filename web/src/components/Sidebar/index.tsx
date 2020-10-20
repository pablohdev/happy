import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import mapMarkerImg from '../../images/map-marker.svg';

import './style.css'

export default function Sidebar() {
    const { goBack } = useHistory();

    return (
        <aside className="appSidebar">
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    );
}
