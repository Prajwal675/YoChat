//import React from 'react'
import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

function Sidebar() {
const [user] = useAuthState(auth); //keeps realtime mapping of users   
const userChatRef = db.collection('chats').where('users', 'array-contains', user.email); //checks where is the email seen for person logged in 
const [chatsSnapshot] = useCollection(userChatRef);
const createChat = () => {
    const input = prompt(
    "enter email of the user to chat "
    );

    if(!input) return null;
    
    if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {

        //add chats to db 'chats' collection if it doesnt already exist & is valid

        db.collection('chats').add({
            users: [user.email, input],

        });
    }
};
    

  const chatAlreadyExists = (recipientEmail) => 
      !!chatsSnapshot?.docs.find(
          (chat)  =>
           chat.data().users.find((user) => user === recipientEmail)?.length > 0
            //go th chats and find inside of user array if user is found with recipient email
      );
      
 
   return( 
    <Container >
        <Header>
            <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

            <IconsContainer>
                <IconButton>
                <ChatIcon />
                
                </IconButton>
                <IconButton>
                <MoreVertIcon />
                </IconButton>
                
            </IconsContainer>
        </Header>

        <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
        </Search>
        <SidebarButton onClick={createChat}>Start A New Chat</SidebarButton>


        {chatsSnapshot?.docs.map((chat) => (

            <Chat key ={chat.id} id={chat.id} users={chat.data().users} />
        ))}
        {/* list of chats */}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow: scroll;

`;
const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 18px;
    border-radius: 2px;

`;

const SidebarButton = styled(Button)`
    width: 100%;
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;

`;

const Header =  styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;

    }
`;
 const IconsContainer =   styled.div``;