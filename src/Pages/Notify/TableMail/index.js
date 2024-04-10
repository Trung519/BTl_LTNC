import { useEffect, useState } from 'react'
import styles from './TableMail.module.scss'
import classNames from 'classnames/bind'
import GetMail from '../../../firebase/Notify/GetMail'

const cx = classNames.bind(styles)

export default function Tablemail() {
    const [page, setPage] = useState(0)             // Phan trang provip
    const [listemail, setListemail] = useState([
        {
            Type: 1,
            Sender: "PHÒNG CÔNG TÁC CHÍNH TRI SINH VIÊN",
            Title: "Khảo sát về chất lương y tế",
            Content: "Thân gửi các cán bộ - nhân viên. Nhằm lấy thông tin về ...",
            Time: "02/03/2024"
        },
        {
            Type: 2,
            Sender: "PHÒNG TÀI VỤ",
            Title: "Thông báo về việc nghỉ Tết Nguyên Đán",
            Content: "Kính gửi Quý vị cán bộ và nhân viên. Nhân dịp Tết Nguyên Đán...",
            Time: "05/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG KẾ HOẠCH - TÀI CHÍNH",
            Title: "Thông báo về chi phí học phí",
            Content: "Gửi đến các sinh viên chính quy. Thông báo về việc điều chỉnh ...",
            Time: "08/03/2024"
        },
        {
            Type: 2,
            Sender: "BAN QUẢN LÝ ĐÀO TẠO",
            Title: "Lịch học kỳ mùa hè",
            Content: "Cập nhật lịch học kỳ mùa hè. Sinh viên theo dõi và điều chỉnh...",
            Time: "10/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG CÔNG TÁC CHÍNH TRI SINH VIÊN",
            Title: "Thông báo về cuộc thi viết văn",
            Content: "Kính gửi sinh viên. Thông báo về việc tổ chức cuộc thi viết văn ...",
            Time: "12/03/2024"
        },
        {
            Type: 2,
            Sender: "PHÒNG TUYỂN SINH",
            Title: "Thông báo về kỳ thi tuyển sinh",
            Content: "Kính gửi thí sinh. Thông báo về kỳ thi tuyển sinh đợt 1 năm 2024...",
            Time: "15/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG TỔ CHỨC - HÀNH CHÍNH",
            Title: "Thông báo về thời gian làm thẻ sinh viên",
            Content: "Gửi đến tất cả sinh viên. Thông báo về thời gian làm thẻ sinh viên ...",
            Time: "18/03/2024"
        },
        {
            Type: 2,
            Sender: "BAN CHẤP HÀNH ĐOÀN TRƯỜNG",
            Title: "Thông báo về buổi gặp mặt cựu sinh viên",
            Content: "Kính gửi cựu sinh viên. Thông báo về buổi gặp mặt sắp tới ...",
            Time: "20/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG CÔNG TÁC CHÍNH TRI SINH VIÊN",
            Title: "Thông báo về khóa học an toàn lao động",
            Content: "Gửi đến sinh viên các lớp Kỹ thuật. Thông báo về việc tổ chức ...",
            Time: "22/03/2024"
        },
        {
            Type: 2,
            Sender: "PHÒNG KHOA HỌC VÀ CÔNG NGHỆ",
            Title: "Thông báo về seminar khoa học",
            Content: "Kính gửi giảng viên và sinh viên. Thông báo về seminar khoa học ...",
            Time: "25/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG CÔNG TÁC CHÍNH TRI SINH VIÊN",
            Title: "Khảo sát về chất lương y tế",
            Content: "Thân gửi các cán bộ - nhân viên. Nhằm lấy thông tin về ...",
            Time: "02/03/2024"
        },
        {
            Type: 2,
            Sender: "PHÒNG TÀI VỤ",
            Title: "Thông báo về việc nghỉ Tết Nguyên Đán",
            Content: "Kính gửi Quý vị cán bộ và nhân viên. Nhân dịp Tết Nguyên Đán...",
            Time: "05/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG KẾ HOẠCH - TÀI CHÍNH",
            Title: "Thông báo về chi phí học phí",
            Content: "Gửi đến các sinh viên chính quy. Thông báo về việc điều chỉnh ...",
            Time: "08/03/2024"
        },
        {
            Type: 2,
            Sender: "BAN QUẢN LÝ ĐÀO TẠO",
            Title: "Lịch học kỳ mùa hè",
            Content: "Cập nhật lịch học kỳ mùa hè. Sinh viên theo dõi và điều chỉnh...",
            Time: "10/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG CÔNG TÁC CHÍNH TRI SINH VIÊN",
            Title: "Thông báo về cuộc thi viết văn",
            Content: "Kính gửi sinh viên. Thông báo về việc tổ chức cuộc thi viết văn ...",
            Time: "12/03/2024"
        },
        {
            Type: 2,
            Sender: "PHÒNG TUYỂN SINH",
            Title: "Thông báo về kỳ thi tuyển sinh",
            Content: "Kính gửi thí sinh. Thông báo về kỳ thi tuyển sinh đợt 1 năm 2024...",
            Time: "15/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG TỔ CHỨC - HÀNH CHÍNH",
            Title: "Thông báo về thời gian làm thẻ sinh viên",
            Content: "Gửi đến tất cả sinh viên. Thông báo về thời gian làm thẻ sinh viên ...",
            Time: "18/03/2024"
        },
        {
            Type: 2,
            Sender: "BAN CHẤP HÀNH ĐOÀN TRƯỜNG",
            Title: "Thông báo về buổi gặp mặt cựu sinh viên",
            Content: "Kính gửi cựu sinh viên. Thông báo về buổi gặp mặt sắp tới ...",
            Time: "20/03/2024"
        },
        {
            Type: 1,
            Sender: "PHÒNG CÔNG TÁC CHÍNH TRI SINH VIÊN",
            Title: "Thông báo về khóa học an toàn lao động",
            Content: "Gửi đến sinh viên các lớp Kỹ thuật. Thông báo về việc tổ chức ...",
            Time: "22/03/2024"
        },
        {
            Type: 2,
            Sender: "PHÒNG KHOA HỌC VÀ CÔNG NGHỆ",
            Title: "Thông báo về seminar khoa học",
            Content: "Kính gửi giảng viên và sinh viên. Thông báo về seminar khoa học ...",
            Time: "25/03/2024"
        },
        {
            Type: 1,
            Sender: "BAN TỔ CHỨC SỰ KIỆN",
            Title: "Thông báo về cuộc thi âm nhạc",
            Content: "Gửi đến tất cả sinh viên. Thông báo về cuộc thi âm nhạc sắp tới ...",
            Time: "28/03/2024"
        },
        {
            Type: 2,
            Sender: "BAN TÀI CHÍNH",
            Title: "Thông báo về quỹ học bổng",
            Content: "Kính gửi sinh viên có hoàn cảnh khó khăn. Thông báo về quỹ học bổng ...",
            Time: "30/03/2024"
        }
    ]);

    const [typeOfEmail, setTypeOfEmail] = useState("received_mail");

    // useEffect(() => {
    //     GetMail(1, typeOfEmail, setListEmail)
    // }, [typeOfEmail])

    return (
        <div className={cx('tablemail-wrapper')}>
            <div className={cx('row', 'primary-row')}>
                <div className={cx('col-md-1', 'primary-checkbox')}>
                    <input type='checkbox'></input>
                </div>
                <div className={cx('col-md-2', 'primary-sender')}>
                    <p>Người gửi</p>
                </div>
                <div className={cx('col-md-8', 'primary-content')}>
                    <p>Nội dung</p>
                </div>
                <div className={cx('col-md-1', 'primary-time')}>
                    <p>Thời gian</p>
                </div>
            </div>
            <div className={cx('content-container')}>
                {
                    Array.from({ length: 10 }, (_, index) => {
                        if (page * 10 + index + 1 > listemail.length) { }
                        else {
                            let count = index % 2;
                            var handleColor = (indexx) => {
                                if (listemail[indexx].Status == 'Xong') return 'done'
                                else if (listemail[indexx].Status == 'Đang khám') return 'doing'
                                else return 'pending'
                            }

                            return (
                                <div key={page * 10 + index + 1} className={cx('row', 'line-row', `line${count}`)}>
                                    <div className={cx('col-md-1')}>
                                        <input type='checkbox'></input>
                                    </div>
                                    <div className={cx('col-md-2', 'sender-col')}>{listemail[page * 10 + index].Sender}</div>
                                    <div className={cx('col-md-8', 'content-col')}>
                                        <span className={cx('content-title')}>{listemail[page * 10 + index].Title}</span>
                                        <span className={cx('content-content')}> - {listemail[page * 10 + index].Content}</span>
                                    </div>
                                    <div className={cx('col-md-1', 'time-col')}>{listemail[page * 10 + index].Time}</div>
                                </div>
                            )
                        }

                    })
                }
            </div>
        </div>
    )
}