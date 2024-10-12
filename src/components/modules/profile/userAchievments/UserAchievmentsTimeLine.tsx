import { FC } from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { useAchievmentsContext } from "../../../../utils/providers/AchievmentsProvider.tsx";
import {toCzechDateFormat} from "../../../../utils/constants";
import {useTranslation} from "react-i18next";

export const UserAchievmentsTimeLine: FC = () => {
    const { t } = useTranslation();
    const { achievements } = useAchievmentsContext();

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
                            <Typography style={{marginTop: "40px"}}>{toCzechDateFormat(achievement.created)}</Typography>
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
};
