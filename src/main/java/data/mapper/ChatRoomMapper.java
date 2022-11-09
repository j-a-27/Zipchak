package data.mapper;

import data.dto.ChatRoomDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChatRoomMapper {
    public List<ChatRoomDto> getChatRoomByUr(int ur_num);
    public void insertRoom(ChatRoomDto crdto);
    public int getSeller(int sp_num);
    public int getRoomChk(ChatRoomDto crdto);
}