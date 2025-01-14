class ApplicationService
  def self.call(args = nil)
    if args.nil?
      new.call
    else
      new.call(**args)
    end
  rescue => error
    ::ApplicationService.notification_error(error)

    [ {}, false ]
  end
end
