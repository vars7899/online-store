import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { IconShoppingBag, IconChevronDown, IconUserCircle, IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShowToAuthenticated, ShowToUnAuthenticated } from "../Authentication";
import { homeList } from "../../navigation/homeList";
import { authThunkActions as ATA } from "../../redux/thunkActions";

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartCount } = useSelector((state) => state.store);

  const navigate = useNavigate();

  return (
    <div className="border-b-[1px]">
      <div className="h-[6px] bg-accent-500"></div>
      <div className="h-[70px] px-4 md:px-12 xl:px-32 flex justify-between items-center xl:justify-between">
        <div className="flex items-center">
          <SmallDeviceMenuList>
            <IconLayoutSidebarLeftExpand className="text-gray-500 xl:hidden" size={28} strokeWidth={1.25} />
          </SmallDeviceMenuList>
          <Link to="/" className="font-semibold text-xl ml-2 xl:ml-0">
            ECCENT
          </Link>
        </div>
        <div className="hidden xl:block">
          <RenderMenuLinks menuList={homeList} />
        </div>
        <div>
          <ShowToAuthenticated>
            <div className="flex items-center justify-end w-full">
              <Link className="md:pr-1 cursor-pointer relative" to="/user/cart">
                <IconShoppingBag strokeWidth={1.5} size={30} />
                <span className="absolute text-xs -bottom-1 left-0 bg-white px-[2px] rounded-full">{cartCount}</span>
              </Link>
              <RenderUserActionMenuButton user={user} />
            </div>
          </ShowToAuthenticated>
          <ShowToUnAuthenticated>
            <div className="flex items-center justify-end w-full">
              <Button variant={"outline"} mr={2} onClick={() => navigate("/login")}>
                Log In
              </Button>
              <Button colorScheme="brandBlack" onClick={() => navigate("/register")}>
                Get Started
              </Button>
            </div>
          </ShowToUnAuthenticated>
        </div>
      </div>
    </div>
  );
};

const RenderMenuLinks = ({ menuList }) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
      {menuList.map((menu, index) => {
        return (
          <Link
            key={`menu-item-${index}`}
            to={menu.path}
            className="font-semibold capitalize mb-2 py-2 px-3 xl:px-6 hover:bg-gray-100 rounded-lg"
          >
            {menu.name}
          </Link>
        );
      })}
    </div>
  );
};

const RenderUserActionMenuButton = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const $logoutUserHandler = () => {
    navigate("/");
    dispatch(ATA.LOGOUT_USER());
  };

  const userOptionList = [
    { name: "profile", path: "/user/profile" },
    { name: "security", path: "/user/security" },
    { name: "wishlist", path: "/user/wishlist" },
    { name: "my orders", path: "/user/orders" },
    { name: "Wallet", path: "/user/wallet" },
  ];

  return (
    <Menu size={"sm"}>
      <MenuButton
        as={Button}
        rightIcon={<IconChevronDown className="hidden md:block" size={16} />}
        variant={"solid"}
        bg={"white"}
        _hover={{ bg: "white" }}
        _expanded={{ bg: "white" }}
        pr={"0"}
      >
        <div className="flex items-center">
          <IconUserCircle strokeWidth={1.75} size={28} />
          <div className="hidden md:flex items-center justify-between py-2 mx-2">
            <div className="flex flex-col items-start">
              <p className="text-sm">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </MenuButton>
      <MenuList>
        {userOptionList.map((option, index) => (
          <MenuItem key={`user-opt-${index}`} className="capitalize" onClick={() => navigate(option.path)}>
            {option.name}
          </MenuItem>
        ))}
        <MenuDivider />
        <MenuItem onClick={$logoutUserHandler}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const SmallDeviceMenuList = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Close list for big devices
  window.addEventListener("resize", (e) => {
    if (window.innerWidth >= 1280) onClose();
  });

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Drawer isOpen={isOpen} placement="left" size={{ base: "full", sm: "sm" }} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className="flex items-center justify-between">
            <Link to="/" className="font-semibold text-lg ml-2 outline-none">
              ECCENT
            </Link>
            <DrawerCloseButton className="mt-1" />
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <RenderMenuLinks menuList={homeList} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
