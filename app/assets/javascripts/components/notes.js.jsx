class Notes extends React.Component {

  render(){
    return(
      <div>
        {
          this.props.notes.map(function(num){
            return <div className="note" key={ num.id }>
                  <p className="note-title">{ num.title }</p>
                  <p className="note-category">{ num.category }</p>
                  <p className="note-content">{ num.content }</p>
                </div>
          })
        }
      </div>
    )
  }
}
