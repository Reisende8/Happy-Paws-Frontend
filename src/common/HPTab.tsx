import { Box, Button } from "@chakra-ui/react";
import react from "react";
import { Link, useLocation } from "react-router-dom";

interface HPTabInterface {
  url: string;
  name: string;
}

export const HPTab: React.FC<HPTabInterface> = ({ url, name }) => {
  const location = useLocation();
  return (
    <Link to={url}>
      <Box
        //py={1}
        px={4}
        _hover={{ bgColor: "primary.500" }}
        borderRadius={100}
        fontSize={location.pathname.includes(url) ? "2xl" : "lg"}
        fontWeight={location.pathname.includes(url) ? "bold" : "semibold"}
        color={"offWhite"}
        bgColor={
          location.pathname.includes(url) ? "primary.600" : "primary.300"
        }
      >
        {name}
      </Box>
    </Link>
  );
};
