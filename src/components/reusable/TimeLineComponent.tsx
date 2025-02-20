import { FC } from "react";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";
import Timeline from "@mui/lab/Timeline";
import { useTranslation } from "react-i18next";
import { AchievementType } from "../../utils/types/AchievementType";
import {achievmentColors} from "../../utils/constants/achievmentColors.ts";
import {toCzechDateFormat} from "../../utils/constants/functions.ts";

type Props = {
    achievements: AchievementType[];
};

export const TimeLineComponent: FC<Props> = ({ achievements }) => {
    const { t } = useTranslation();

    const getDotColor = (index: number) => {
        const total = achievements.length;
        if (index === total - 1) return achievmentColors.gold;
        if (index === total - 2) return achievmentColors.silver;
        return achievmentColors.gray;
    };

    return (
        <Timeline position="alternate">
            {achievements.map((achievement, index) => (
                <TimelineItem key={achievement.id}>
                    <TimelineOppositeContent
                        sx={{ m: 'auto 0' }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                    >
                        <Typography style={{ marginTop: "5vh" }}>
                            {toCzechDateFormat(achievement.created)}
                        </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot style={{ backgroundColor: getDotColor(index) }} />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="h6" component="span">
                            Achievement #{index + 1}
                        </Typography>
                        <Typography>{t(achievement.text)}</Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
};
