import React from "react";
import {Col} from "react-bootstrap";
import styles from "../ProfileItem.module.scss"
import Card from "../../../UI/Card/Card";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserProfile} from "../../../../redux/selectors/profile-selectors";
import {getTotalUsersCount, getUsersFiltered} from "../../../../redux/selectors/users-selectors";
import {useAuth} from "../../../../hook/useAuth";
import ProfileData from "../ProfileItemData";
import CardTitle from "../../../UI/Card/CardTitle";
import CardContent from "../../../UI/Card/CardContent";
import classNames from 'classnames';

const ProfileAbout = ({}) => {
    const profile = useSelector(state => getUserProfile(state))
    const filteredUsers = useSelector(state => getUsersFiltered(state))
    const filteredUsersCount = useSelector(state => getTotalUsersCount(state))
    const {authorisedUser, authorisedUserId} = useAuth()
    const selectedUserId = useParams().id
    const isCurrentUserAuthorised = !selectedUserId || (authorisedUserId === +selectedUserId);

    const additionalInfo = (profile) => (
        profile.lookingForAJobDescription &&
        <li>
            <span className={styles.title}>Professional skills: </span>
            <span className={styles.text}>{profile.lookingForAJobDescription}</span>
        </li>
    )

    return (
        <>
            <Col xs={4}>
                <ProfileData profile={profile}
                             title="Personal Info"
                             additionalInfo={additionalInfo(profile)}
                >
                    <Contacts
                        contacts={authorisedUser && isCurrentUserAuthorised ? authorisedUser.contacts : profile.contacts}/>
                </ProfileData>
            </Col>
            <Col xs={8}>
                <ProfileFakeData/>
            </Col>
        </>
    )
}

const Contacts = ({contacts}) => {
    const contactsKeys = Object.keys(contacts);

    return (
        <div className={`${styles.socials} ${styles.widget}`}>
            <h6 className={styles.title}>Other Social Networks:</h6>
            {
                contacts && contactsKeys.length > 0 ?
                    contactsKeys.map(key => {
                        if (contacts[key]) {
                            return <ContactsItem key={key}
                                                 contactTitle={key}
                                                 contactValue={contacts[key]
                                                 }
                            />
                        }
                    })
                    :
                    <div>You have no social networks added. You can add them in your profile settings.</div>

            }
        </div>
    )
}

const ContactsItem = ({contactTitle, contactValue}) => {
    return (
        <a href={contactValue}
           className={classNames(styles.socialItem, styles[`${contactTitle}Bg`])}>
            {contactTitle}
        </a>
    )
}

const ProfileFakeData = () => {
    return (
        <>
            <Card>
                <CardTitle title="Hobbies and Interests"/>
                <CardContent>
                    <div className="row">
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12 mb-3 mb-md-0">

                            <ul className="widget w-personal-info item-block">
                                <li>
                                    <span className="title">Hobbies:</span>
                                    <span className="text">I like to ride the bike to work, swimming, and working out. I also like
															reading design magazines, go to museums, and binge watching a good tv show while it’s raining outside.
														</span>
                                </li>
                                <li>
                                    <span className="title">Favourite TV Shows:</span>
                                    <span className="text">Breaking Good, RedDevil, People of Interest, The Running Dead, Found,  American Guy.</span>
                                </li>
                                <li>
                                    <span className="title">Favourite Movies:</span>
                                    <span className="text">Idiocratic, The Scarred Wizard and the Fire Crown,  Crime Squad, Ferrum Man. </span>
                                </li>
                                <li>
                                    <span className="title">Favourite Games:</span>
                                    <span className="text">The First of Us, Assassin’s Squad, Dark Assylum, NMAK16, Last Cause 4, Grand Snatch Auto. </span>
                                </li>
                            </ul>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                            <ul className="widget w-personal-info item-block">
                                <li>
                                    <span className="title">Favourite Music Bands / Artists:</span>
                                    <span className="text">Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.</span>
                                </li>
                                <li>
                                    <span className="title">Favourite Books:</span>
                                    <span className="text">The Crime of the Century, Egiptian Mythology 101, The Scarred Wizard, Lord of the Wings, Amongst Gods, The Oracle, A Tale of Air and Water.</span>
                                </li>
                                <li>
                                    <span className="title">Favourite Writers:</span>
                                    <span className="text">Martin T. Georgeston, Jhonathan R. Token, Ivana Rowle, Alexandria Platt, Marcus Roth. </span>
                                </li>
                                <li>
                                    <span className="title">Other Interests:</span>
                                    <span className="text">Swimming, Surfing, Scuba Diving, Anime, Photography, Tattoos, Street Art.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardTitle title="Education and Employement"/>
                <CardContent>
                    <div className="row">
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                            <ul className="widget w-personal-info item-block">
                                <li>
                                    <span className="title">The New College of Design</span>
                                    <span className="date">2001 - 2006</span>
                                    <span className="text">Breaking Good, RedDevil, People of Interest, The Running Dead, Found,  American Guy.</span>
                                </li>
                                <li>
                                    <span className="title">Rembrandt Institute</span>
                                    <span className="date">2008</span>
                                    <span className="text">Five months Digital Illustration course. Professor: Leonardo Stagg.</span>
                                </li>
                                <li>
                                    <span className="title">The Digital College </span>
                                    <span className="date">2010</span>
                                    <span className="text">6 months intensive Motion Graphics course. After Effects and Premire. Professor: Donatello Urtle. </span>
                                </li>
                            </ul>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                            <ul className="widget w-personal-info item-block">
                                <li>
                                    <span className="title">Digital Design Intern</span>
                                    <span className="date">2006-2008</span>
                                    <span className="text">Digital Design Intern for the “Multimedz” agency. Was in charge of the communication with the clients.</span>
                                </li>
                                <li>
                                    <span className="title">UI/UX Designer</span>
                                    <span className="date">2008-2013</span>
                                    <span className="text">UI/UX Designer for the “Daydreams” agency. </span>
                                </li>
                                <li>
                                    <span className="title">Senior UI/UX Designer</span>
                                    <span className="date">2013-Now</span>
                                    <span className="text">Senior UI/UX Designer for the “Daydreams” agency. I’m in charge of a ten person group, overseeing all the proyects and talking to potential clients.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ProfileAbout
