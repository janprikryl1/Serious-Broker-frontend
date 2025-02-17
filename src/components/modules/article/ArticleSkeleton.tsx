import {FC} from 'react';
import Skeleton from 'react-loading-skeleton';

export const ArticleSkeleton: FC = () => {
    return (
        <div className="container blog-details__item-inner">
            <Skeleton height={40} width="50%" style={{ marginBottom: '20px' }} />
            <Skeleton height={20} width="80%" style={{ marginBottom: '10px' }} />
            <Skeleton height={20} width="75%" style={{ marginBottom: '10px' }} />
            <Skeleton height={20} width="85%" style={{ marginBottom: '10px' }} />
            <br />
            <Skeleton height={30} width="60%" style={{ marginBottom: '20px' }} />
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <Skeleton height={200} width="100%" />
                    </div>
                    <div className="col-sm-8">
                        <Skeleton height={20} width="90%" style={{ marginBottom: '10px' }} />
                        <Skeleton height={20} width="95%" style={{ marginBottom: '10px' }} />
                        <Skeleton height={20} width="80%" style={{ marginBottom: '10px' }} />
                    </div>
                </div>
            </div>
            <Skeleton height={40} width={120} style={{ marginRight: '10px' }} />
        </div>
    );
};