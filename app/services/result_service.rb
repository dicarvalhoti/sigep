class ResultService
  def initialize(success:, data:, errors: [])
    @success = success
    @data = data
    @errors = Array(errors)
  end

  def success?
    @success
  end

  def data
    @data
  end

  def failure?
    !@success
  end

  def errors
    @errors
  end

  def to_h
    {
      success: @success,
      data: @data,
      errors: @errors
    }
  end
end
