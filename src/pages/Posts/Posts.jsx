import React from "react";
import PostPage from "./PostPage";
import Dashboard from './../../components/dashboard/Dashboard';

import { ToastContainer, toast } from 'react-toastify';
export default function Posts() {
  return (
    <>
      <Dashboard mainContent={<PostPage/>} />
    </>
  );
}
