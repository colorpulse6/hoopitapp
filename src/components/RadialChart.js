import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../App.css';
const DEFAULT_COLOR = '#040404';



export default class RadialChart extends Component {
    state = {}
    componentDidMount() {
        // For initial animation
        setTimeout(() => {
            this.setState({ setStrokeLength: true });
        });
    }
    render() {
        const { setStrokeLength } = this.state;
        const {
            className,
            radius,
            progress,
            strokeWidth,
            dimension,
            color,
            number,
            text
        } = this.props;
        
        const circleRadius = Math.min(radius, 85);
        const circumference = 2 * 3.14 * circleRadius;
        const strokeLength = setStrokeLength ? circumference / 100 * progress : 0;
        const textStyles = {
            fontSize: '28px',
            maxWidth: '5ch'
       
        }
        const numStyles = {
            fontSize: '40px'
        }
return (
           <div
                className={classNames('radial-chart', className, {
                    'no-progress': strokeLength === 0
                })}
           >
               <svg viewBox="0 0 180 180" width='50' height='50'>
                    <text textAnchor="middle" x="90" y="85" style={numStyles}>{number}</text>
                    
                    <text textAnchor="middle" x="90" y="120" style={textStyles}>{text}</text>
                   <circle
                       className="radial-chart-total"
                       stroke={color}
                       strokeWidth={strokeWidth}
                       fill="none"
                       cx="90"
                       cy="90"
                       r={circleRadius}
                       
                   />
                   <circle
                       className="radial-chart-progress"
                       stroke={color}
                       strokeWidth={strokeWidth}
                       strokeDasharray={`${strokeLength},${circumference}`}
                       strokeLinecap="round"
                       fill="none"
                       cx="90"
                       cy="90"
                       r={circleRadius}
                   />
               </svg>
           </div>
        );
    }
}
RadialChart.defaultProps = {
    radius: 90,
    progress: 100,
    strokeWidth: 5,
    dimension: 180,
    color: DEFAULT_COLOR
};
RadialChart.propTypes = {
    className: PropTypes.string,
    radius: PropTypes.number,
    strokeWidth: PropTypes.number,
    color: PropTypes.string,
    progress: PropTypes.number,
    dimension: PropTypes.number,
    number: PropTypes.string,
    text: PropTypes.string
};
