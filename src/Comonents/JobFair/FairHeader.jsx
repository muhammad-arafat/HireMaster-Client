import { Link } from "react-router-dom";
import {
  AddIcon,
  CheckIcon,
  ChevronDownIcon,
  DragHandleIcon,
  HamburgerIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getFairRegisteredUser } from "../../api";
import useAuth from "../Hooks/Auth/useAuth";
import { TbLogout2 } from "react-icons/tb";

const FairHeader = () => {
  const [fairUser, setFairUser] = useState({});
  const [registeredType, setRegisteredType] = useState("");

  const { user } = useAuth();
  // const email = "abc@debugger.com";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getFairRegisteredUser(user?.email);
        setFairUser(res.data);
        if (res.data.userType) {
          setRegisteredType(res.data.userType);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [user]);
  console.log(registeredType);
  console.log(fairUser);

  return (
    <div className='flex items-center justify-between bg-gray-400 px-5 py-3'>
      <Link to='/' className='w-32'>
        <img
          src='https://i.ibb.co/BcFWdqk/Hire-Master-Logo-2.png'
          className='w-full'
          alt=''
        />
      </Link>
      <div className='flex items-center gap-x-5'>
        {registeredType === "sponsor" && (
          <Link
            to='/job-fair/profile/sponsor-create-event'
            className='flex items-center'
          >
            <AddIcon color='black' h={3} w={3} marginRight={1} />
            <p className='font-bold tracking-tight'>Create Event</p>
          </Link>
        )}

        {!registeredType ? (
          <Link to='/job-fair/registration'>
            <button className='font-bold'>Sign in</button>
          </Link>
        ) : null}

        <div className=' bg-white rounded-2xl overflow-hidden px-2 py-1'>
          <SearchIcon marginRight={1} h={4} w={4} color='black' />
          <input
            type='search'
            className='outline-none bg-inherit placeholder-black'
            placeholder='Search All Events'
          />
        </div>
        <Menu>
          <MenuButton>
            <div className=' flex items-center border rounded-xl  px-2'>
              <Avatar
                src={fairUser?.profilePicture || undefined}
                icon={
                  !fairUser?.profilePicture ? (
                    <BsFillPersonVcardFill />
                  ) : (
                    undefined
                  )
                }
                size='md'
              />
              <Box ml='1'>
                <ChevronDownIcon color={"white"} />
              </Box>
            </div>
          </MenuButton>
          <MenuList>
            {registeredType === "job-seeker" && (
              <MenuGroup title='Profile' marginBottom={5}>
                <MenuDivider />
                <MenuItem
                  as={Link}
                  to='/job-fair/profile'
                  marginBottom={3}
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <DragHandleIcon marginRight={1} />
                  My Profile
                </MenuItem>
                <MenuItem
                  as={Link}
                  to='/job-fair/profile/bookings'
                  marginBottom={3}
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <CheckIcon marginRight={1} />
                  Bookings
                </MenuItem>
                <MenuItem
                  as={Link}
                  to='/job-fair/profile/interested-events'
                  marginBottom={3}
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <StarIcon marginRight={1} />
                  Events
                </MenuItem>
                <MenuItem
                  as={Link}
                  to='/job-fair/profile/settings'
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <SettingsIcon marginRight={1} />
                  Settings
                </MenuItem>
              </MenuGroup>
            )}
            {registeredType === "sponsor" && (
              <MenuGroup title='Profile' marginBottom={5}>
                <MenuDivider />
                <MenuItem
                  as={Link}
                  to='/job-fair/profile'
                  marginBottom={3}
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <DragHandleIcon marginRight={1} />
                  My Profile
                </MenuItem>

                <MenuItem
                  as={Link}
                  to='/job-fair/profile/sponsor-event'
                  marginBottom={3}
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <HamburgerIcon marginRight={1} />
                  My Events
                </MenuItem>
                <MenuItem
                  as={Link}
                  to='/job-fair/profile/sponsor-event-bookings'
                  marginBottom={3}
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <CheckIcon marginRight={1} />
                  Booked Events
                </MenuItem>
                <MenuItem
                  as={Link}
                  to='/job-fair/profile/settings'
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <SettingsIcon marginRight={1} />
                  Settings
                </MenuItem>
                <MenuItem
                  as={Link}
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  <Icon as={TbLogout2} marginRight={1} />
                  Logout
                </MenuItem>
              </MenuGroup>
            )}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default FairHeader;
