<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    hiddenIcon: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    const { icon, title, hiddenIcon } = context.props
    const vnodes = []

    if (icon && !hiddenIcon) {
      // vnodes.push(<svg-icon icon-class={icon} />)
      vnodes.push(<i class={'iconfont icon-' + icon} />)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
