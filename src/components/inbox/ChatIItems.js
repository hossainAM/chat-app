import ChatItem from "./ChatItem";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Error from "../ui/Error";
import getPartnerInfo from "../../utils/getPartnerInfo";
import moment from 'moment';
import gravatarUrl from 'gravatar-url';

export default function ChatItems() {
    const { user } = useSelector((state) => state.auth) || {};

    const { email } = user || {};

    const {data:conversations, isLoading, isError, error} = useGetConversationsQuery(email);

    // console.log(conversations);

    //decide what to render
    let content = null;

    if(isLoading) {
        content = <li className="m-2 text-center">Loading...</li>
    } else if(!isLoading && isError) {
        content = (
         <li> 
            <Error message ={error?.data} />
        </li >
        );
    } else if(!isLoading && !isError & conversations?.length === 0) {
        content = <li className="m-2 text-center">No conversation found!</li>
    } else if(!isLoading && !isError && conversations?.length > 0) {
        content = conversations.map(conversation => {
            const { id, message, timestamp } = conversation;
            const { email } = user || {};
            const { name, email: partnerEmail } = getPartnerInfo(conversation.users, email);

            return (
                <Link to={`/inbox/${id}`}><li key={id}>
                <ChatItem
                    avatar={gravatarUrl(partnerEmail, {
                        size: 80,
                    })}
                    name={name}
                    lastMessage={message}
                    lastTime={moment(timestamp).fromNow()}
                />
            </li></Link>
            );
        });
    }

    return (
        <ul>
            {content}
        </ul>
    );
}
