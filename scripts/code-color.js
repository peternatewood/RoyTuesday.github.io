function highlightCode( node, keywords )
{
	var text = node.textContent;
	node.textConctent = "";

	var match, pos = 0;
	while ( match = keywords.exec( text ) )
	{
		var before = text.slice( pos, match.index );
		node.appendChild( document.createTextNode( match[ 0 ] ) );
		node.appendChild( strong );
		pos = keywords.lastIndex;
	}
	var after = text.slice( pos );
	node.appendChild( document.createTextNode( after ) );
}

highlightCode( "pre", /var/ );