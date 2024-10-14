import {FC} from "react";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";
import Timeline from "@mui/lab/Timeline";
import {useTranslation} from "react-i18next";
import {toCzechDateFormat} from "../../../utils/constants";
import {AchievementType} from "../../../utils/types/AchievementType.ts";

type Props = {
    achievements: AchievementType[];
};

export const TimeLineComponent:FC<Props> = ({achievements}) => {
    const { t } = useTranslation();
    
    return (
        <Timeline position="alternate">
            {achievements.map((achievement, index) => {
                return (
                    <TimelineItem key={achievement.id}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            <Typography style={{marginTop: "5vh"}}>{toCzechDateFormat(achievement.created)}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color={achievement.read == 1 ? "primary" : "grey"} />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Achievement #{index + 1}
                            </Typography>
                            <Typography>{t(achievement.text)}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
}