// 封装获取频道列表的逻辑
import { useEffect, useState } from "react";
import { getChannelListUsingGet } from "@/apis/article";

export const useChannel = () => {
  // 获取频道列表
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    // 获取频道信息
    const getChannelList = async () => {
      const res = await getChannelListUsingGet();
      setChannelList(res.data.channels);
    };

    getChannelList();
  }, []);

  return {
    channelList,
  };
};
