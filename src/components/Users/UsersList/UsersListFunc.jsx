import React from "react";
import styles from './UsersList.module.css'
import UsersListItem from "../UsersListItem/UsersListItem";
import axios from "axios";

const UsersListFunc = ({users, setUsers}) => {

    const getUsers = () => {
        if (users.length === 0) {

            axios.get('https://social-network.samuraijs.com/api/1.0/users').then( (response) => {
                setUsers(response.data.items)
            })
                .catch(function (error) {
                    console.log(error);
                })

            /*setUsers([
                {
                    id: 1,
                    name: 'Dmitriy K.',
                    status: 'I am looking for a job right now...',
                    location: {
                        city: 'Ukraine',
                        country: 'Kharkiv'
                    },
                    imageURL: 'https://i.pinimg.com/1200x/4f/f3/89/4ff3894daa120e3a172826f27203033c.jpg',
                    followed: true
                },
                {
                    id: 2,
                    name: 'Svetlana D.',
                    status: 'I am so pretty!',
                    location: {
                        city: 'Ukraine',
                        country: 'Sumy'
                    },
                    imageURL: 'https://i.pinimg.com/736x/43/64/7f/43647f92257cd9a3a4a56102d3ebc65c.jpg',
                    followed: false
                },
                {
                    id: 3,
                    name: 'Sergei J.',
                    status: 'I like football!',
                    location: {
                        city: 'Ukraine',
                        country: 'Kiev'
                    },
                    imageURL: 'https://i.pinimg.com/736x/43/64/7f/43647f92257cd9a3a4a56102d3ebc65c.jpg',
                    followed: false
                },
                {
                    id: 4,
                    name: 'Andrew V.',
                    status: 'I am free to help you learn JS',
                    location: {
                        city: 'United States',
                        country: 'Philadelphia'
                    },
                    imageURL: 'https://i.pinimg.com/736x/43/64/7f/43647f92257cd9a3a4a56102d3ebc65c.jpg',
                    followed: true
                }
            ])*/
        }
    }

    return (
        <>
            <h3>Users</h3>
            <button onClick={getUsers}>Get Users</button>
            <ul>
                {
                    users.map(user => (
                        <UsersListItem key={user.id}
                                       id={user.id}
                                       name={user.name}
                                       status={user.status}
                                       followed={user.followed}
                                       location={user.location}
                                       photos={user.photos}/>
                    ))
                }
            </ul>
            <button className={styles.showMoreBtn} type="button">Show more</button>
        </>
    )
}

export default UsersListFunc
