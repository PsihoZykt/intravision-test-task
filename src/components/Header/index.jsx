import React from 'react';
import analytics from '../../assets/img/navbar/analytics.png'
import clients from '../../assets/img/navbar/clients.png'
import employees from '../../assets/img/navbar/employees.png'
import knowledge_base from '../../assets/img/navbar/knowledge_base.png'
import logo from '../../assets/img/navbar/logo.png'
import settings from '../../assets/img/navbar/settings.png'
import tasks from '../../assets/img/navbar/tasks.png'
import s from './index.module.css'
const Header = () => {
    return <div>
        <Navbar />
        <TopMenu />
    </div>
}
const TopMenu = () => {
    return <div className={s.topMenu}>
        <div className={s.searchField}>

        </div>
    </div>
}
const Navbar = () => {
    return (
        <div className={s.navbar}>
            <div className={s.navbarItem} >
                <img src={logo} alt="Intravision logo, looks like bottom-arrow"/></div>
            <div className={s.navbarItem}>
                <img src={knowledge_base} alt="A book"/>
            <div> База знаний</div>
            </div>
            <div className={s.navbarItem}>
                <img src={tasks} alt="A paper"/>
                <div> Заявки</div>
            </div>
            <div className={s.navbarItem}>
                <img src={employees} alt="three people"/>
                <div> Сотрудники </div>
            </div>
            <div className={s.navbarItem}>
                <img src={clients} alt="some buildings"/>
                <div> Клиенты </div>
            </div>
            <div className={s.navbarItem}>
                <img src={analytics} alt="screen with some dashboards on it"/>
                <div> Активы</div>
            </div>
            <div className={s.navbarItem}>
                <img src={settings} alt="cogwheel"/>
                <div> Настройки </div>
            </div>
        </div>
    );
};

export default Header;