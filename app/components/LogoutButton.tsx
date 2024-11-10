'use client';

import { useRouter } from "next/navigation";
import { resetAuthCookies } from '../lib/actions';
import MenuLink from "./navbar/MenuLink";
import { useSnackbar } from 'notistack';


const LogoutButton: React.FC = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const submitLogout = async () => {
        resetAuthCookies();
        enqueueSnackbar('با موفقیت خارج شدید!', { variant: 'success' });
        router.push("/")
        router.refresh
    }


    return (
        <MenuLink
            label="خروج"
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;