import { Avatar, Box, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface UserInfoProps {
  name: string;
  cpf: string;
  phone: string;
  profilePicture?: string; // URL da foto de perfil (opcional)
}

const UserInfo = ({ name, cpf, phone,  profilePicture }: UserInfoProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      padding={2}
      borderRadius={2}
      boxShadow={2}
      bgcolor="background.paper"
      gap={2}
    >
      {profilePicture ? (
        <Avatar src={profilePicture} alt={`${name}'s Profile`} sx={{ width: 56, height: 56 }} />
      ) : (
        <Avatar sx={{ width: 56, height: 56 }}>
          <AccountCircleIcon fontSize="large" />
        </Avatar>
      )}

      <Box>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cpf}
        </Typography>
        <Typography variant="body2" color="text.secondary"> {phone} </Typography>
      </Box>
    </Box>
  );
}

export default UserInfo;
