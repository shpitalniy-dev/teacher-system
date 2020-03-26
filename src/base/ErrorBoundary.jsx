import React, { Fragment } from 'react';
import PureComponent from './PureComponent.jsx';

const ErrorBoundary = (ComposedComponent) => {
    class WrapperComponent extends PureComponent {
        state = { hasError: false, error: '' };

        static getDerivedStateFromError(error) {
            return {
                hasError: true,
                error: error
            };
        }

        getBody() {
            const { hasError, error } = this.state;

            return (
                !hasError ?
                    <ComposedComponent { ...this.props } /> :
                    <div className='error-boundary' style={ { color: 'red' } }>
                        {`${getDisplayName(WrapperComponent)}: ${error.toString()}`}
                    </div>
            );
        }

        render() {
            return (
                <Fragment>
                    { this.getBody() }
                </Fragment>
            );
        }
    }

    WrapperComponent.displayName = `ErrorBoundary(${getDisplayName(ComposedComponent)})`;
    return WrapperComponent;
};

export function getDisplayName(ComposedComponent) {
    return ComposedComponent.displayName ? ComposedComponent.displayName : (ComposedComponent.name ? ComposedComponent.name : 'NameLessComponent');
}

export default ErrorBoundary;

