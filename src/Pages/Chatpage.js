import { Box } from "@chakra-ui/react";
import { Chatstate } from "../Context/ChatProvider"
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";

const Chatpage = () => {
  const {user} = Chatstate();
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5hv"
        p="10px"
      >
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}

export default Chatpage
