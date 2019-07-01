import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
<% if (useRedux) { %>
import { connect } from 'dva';
<% } %>

<% if (classPage) { %>
class <%=name %> extends PureComponent {
    render() {
        return (
            <div styleName='<%=name %>-wrap'>
                <p><%= name %></p>
            </div>
        );
    }
}
<% } else { %>
function <%= name %> () {
    return (
        <div styleName='<%=name %>-wrap'>
            <p><%= name %></p>
        </div>
    )
};
<% } %>

<%= name %>.propTypes = {

};

<%= name %>.defaultProps = {

};

<% if (useRedux) { %>
export default connect((state) => {

})(<%= name %>)
<% } else { %>
export default <%= name %>;
<% } %>