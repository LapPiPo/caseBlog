import { useUser } from '../../../context/AuthContext.js';
import { useEffect, useState } from 'react';
import {
    Stack,
    Input,
    Textarea,
    Button,
    Typography,
    Select,
    Option,
    FormControl,
    FormLabel,
} from '@mui/joy';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URl_POST } from "../../../URL";

export default function AddContent() {
    const { user } = useUser();
    const navigate = useNavigate();

    // State cho bài viết
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [authorId, setAuthorId] = useState('');

    // Lấy ID tác giả khi có user
    useEffect(() => {
        if (user?.id) {
            setAuthorId(user.id);
        }
    }, [user]);

    // Gửi dữ liệu lên server
    const addPost = async () => {
        try {
            await axios.post(URl_POST, {
                title,
                content,
                authorId,
                visibility,
            });
            alert('Đăng bài thành công');
            navigate('/');
        } catch (error) {
            console.error('Lỗi khi đăng bài:', error);
            alert('Đăng bài thất bại');
        }
    };

    return (
        <Stack
            spacing={3}
            sx={{
                maxWidth: 600,
                mx: 'auto',
                mt: 4,
                minHeight: '80vh', // Giữ layout ổn định
            }}
        >
            <Typography level="h3">📝 Tạo bài viết mới</Typography>

            {/* Tiêu đề */}
            <FormControl>
                <FormLabel>Tiêu đề</FormLabel>
                <Input
                    placeholder="Nhập tiêu đề bài viết"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormControl>

            {/* Tác giả */}
            <FormControl>
                <FormLabel>Tác giả</FormLabel>
                <Input value={user?.name || 'Ẩn danh'} disabled />
            </FormControl>

            {/* Chế độ hiển thị */}
            <FormControl>
                <FormLabel>Chế độ hiển thị</FormLabel>
                <Select
                    value={visibility}
                    onChange={(event, newValue) => setVisibility(newValue)}
                    slotProps={{
                        listbox: { sx: { overflowY: 'auto' } }, // tránh layout shift
                    }}
                >
                    <Option value="public">Công khai</Option>
                    <Option value="private">Riêng tư</Option>
                </Select>
            </FormControl>

            {/* Nội dung */}
            <FormControl>
                <FormLabel>Nội dung</FormLabel>
                <Textarea
                    placeholder="Viết nội dung bài viết..."
                    minRows={6}
                    maxRows={10} // Giới hạn auto-resize
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </FormControl>

            {/* Nút đăng bài */}
            <Button onClick={addPost} color="success" size="lg">
                Đăng bài
            </Button>
        </Stack>
    );
}
